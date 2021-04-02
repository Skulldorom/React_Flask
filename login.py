from models import User
from werkzeug.security import check_password_hash
from log import log
from flask_login import login_user
from flask_jwt_extended import create_access_token, decode_token

def login_account(email,password):
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):

        login_user(user)

        access_token = create_access_token(email,password)

        return True,access_token

    return False

def token_manager(token):
    data = decode_token(token)
    return login_account(data['sub'],data['fresh'])
    



