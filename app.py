from flask import Flask, Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
import os
from log import log
import secret

db = SQLAlchemy()

def create_app():
    # set the project root directory as the static folder, you can set others.
    app = Flask(__name__,
                static_url_path='',
                static_folder='front/build')

    app.secret_key = secret.appkey

    jwt=JWTManager(app)

    if app.config['DEBUG']:
        CORS(app)
        log("Using CORS").success()
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        log("Using SQL Lite").success()
    else:
        import os
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        log("Using Env").success()

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    db.init_app(app)
    from models import User

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))    

    return app

if __name__ == '__main__':
    app.run()

app=create_app()
