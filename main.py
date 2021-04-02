from flask import Blueprint, Flask, request, jsonify
from models import Rsvp
from flask_login import  login_required, current_user
from login import token_manager

app = Flask(__name__,static_url_path='',static_folder='front/build')
main = Blueprint('main', __name__)

@main.route('/')
def root():
    return app.send_static_file('index.html')

# Here is an example method of sending data if the user is logged in
@main.route('/api/getinfo', methods=['POST'])
def special():
    post_data = request.get_json()
    token = post_data['token']
    if token == '':
        return 401
    else:
        token_manager(token)

    return jsonify({
        'status': 'success',
        'name': current_user.fname,
        'data': 'Hey there '+current_user.fname+' how are you doing?'
    }),202


@main.route('/db/create', methods=['GET'])
def create_db():
    from models import create_db
    create_db()
    return 'success'