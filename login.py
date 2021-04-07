from models import User
from werkzeug.security import check_password_hash, generate_password_hash
from log import log
from flask_login import login_user
from flask_jwt_extended import create_access_token, decode_token

def login_account(email,password,verified):
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password) or verified:

        login_user(user)

        enc_email = generate_password_hash(user.email)
        access_token = create_access_token(enc_email+','+str(user.id))

        return True,access_token

    return False

def token_manager(token):
    data = decode_token(token)
    new = data['sub'].split(',')
    enc_email = new[0]
    userid = new[1]
    
    user = User.query.filter_by(id=userid).first()
    if check_password_hash(enc_email,user.email):
        return login_account(user.email,user.password,True)
    else:
        return False