from flask import Flask, Blueprint, jsonify, request
from app import db
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from log import log
from login import login_account,token_manager
from flask_login import login_user, login_required, logout_user, current_user
from flask_jwt_extended import create_access_token, create_refresh_token, decode_token

auth = Blueprint('auth', __name__)

@auth.route('/auth/loggedin', methods=['POST'])
def loggin_check():
    post_data = request.get_json()
    token = post_data['token']
    if token == '':
        print('no token')
    else:
        token_manager(token)

    if current_user.is_authenticated:
        response_object = {
            'status': 'Success',
            'value': True,
            'name':current_user.fname
        }
        return jsonify(response_object), 200
    response_object = {
            'status': 'Failed',
            'value': False,
            'name':''
        }
    return jsonify(response_object), 200
    

@auth.route('/auth/logout')
@login_required
def logout():
    logout_user()
    response_object = {
            'status': 'success',
            'message': 'User logged out'
        }
    return jsonify(response_object), 201


@auth.route('/auth/login', methods=['POST'])
def login():
    post_data = request.get_json()
    print(post_data)

    response_object = {
        'status': 'fail',
        'message': 'Invalid payload.'
    }

    email = post_data['email'].lower()
    password = post_data['password']

    status,access_token = login_account(email,password)        
    if status:
        response_object = {
            'status': 'success',
            'message': 'User logged in',
            'name': current_user.fname,
            'access_token': access_token
        }


        log(current_user.email," has logged in").success()
        return jsonify(response_object), 202

    return jsonify(response_object), 400

@auth.route('/auth/create', methods=['POST'])
def create():
    post_data = request.get_json()

    email = post_data['email'].lower()
    fname = post_data['first name']
    lname = post_data['last name']
    password = post_data['password']
    telephone = post_data['tel']

    if User.query.filter_by(email=email).first():
        response_object = {
            'status': 'fail',
            'message': 'Email already exists.'
        }
        return jsonify(response_object), 406

    if User.query.filter_by(telephone=telephone).first():
        response_object = {
            'status': 'fail',
            'message': 'Phone number already exists.'
        }
        return jsonify(response_object), 406
    

    newuser = User(email,fname,lname,telephone,generate_password_hash(password, method='sha256'))
    db.session.add(newuser)
    db.session.commit()

    response_object = {
            'status': 'success',
            'message': 'Account created successfully'
        }

    log("Account created successfully").success()    
    return jsonify(response_object), 202