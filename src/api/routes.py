"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Organization, Resource
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
# import Organization

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route("/login", methods = ["POST"])
def create_token():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if not email: 
            return jsonify({"message": "Email is required"}), 400
        if not password: 
            return jsonify({"message": "Password is required"}), 400
        user = User.query.filter_by(email=email).first()
        # print(user.password)
        if not user: 
            return jsonify({"message": "email is incorrect"}), 401
        if not check_password_hash(user.password, password):
            return jsonify({"message": "password is incorrect"}), 401
        
        expiration = datetime.timedelta(days=3)
        access_token = create_access_token(identity = user.id, expires_delta=expiration)
        return jsonify(access_token=access_token, is_org=user.is_org, avatar=user.avatar)

@api.route("/createUser", methods = ["POST"])
def create_user():
    if request.method == "POST":
        request_body = request.get_json()
        if not request_body['is_org']:
            return jsonify({"message": 'Must enter yes or no'})
        if not request_body["name"]:
            return jsonify({"message": "Name is required"}), 400
        if not request_body["email"]:
            return jsonify({"message": "Email is required"}), 400
        if not request_body["password"]:
            return jsonify({"message": "Password is required"}), 400
        user = User.query.filter_by(email=request_body["email"]).first()
        if user: 
            return jsonify({"message": "email already exists"}), 400
        user = User(
            is_org = request_body['is_org'],
            name = request_body["name"],
            email = request_body["email"],
            password = generate_password_hash(request_body["password"]),
            avatar = request_body['userAvatar']
            )
        db.session.add(user)
        db.session.commit()
        return jsonify({"created": "Thank you for registering", "status": "true"}), 200

# @api.route("/loginOrganization", methods = ["POST"])
# def create_token2(): 
#         email = request.json.get("email", None)
#         password = request.json.get("password", None)
#         if not email: 
#             return jsonify({"message": "Email is required"}), 400
#         if not password: 
#             return jsonify({"message": "Password is required"}), 400
#         user = Organization.query.filter_by(email=email).first()
#         if not user: 
#             return jsonify({"message": "email is incorrect"}), 401
#         if not check_password_hash(user.password, password):
#             return jsonify({"message": "password is incorrect"}), 401
#         expiration = datetime.timedelta(days=3)
#         access_token = create_access_token(identity = user.id, expires_delta=expiration)
#         return jsonify(access_token=access_token)

# @api.route("/createOrganization", methods = ["POST"])
# def create_organization():
#     if request.method == "POST":
#         request_body = request.get_json()
#         if not request_body["name"]:
#             return jsonify({"message": "Name is required"}), 400
#         if not request_body["email"]:
#             return jsonify({"message": "Email is required"}), 400
#         if not request_body["password"]:
#             return jsonify({"message": "Password is required"}), 400
#         user = Organization.query.filter_by(email=request_body["email"]).first()
#         if user: 
#             return jsonify({"message": "email already exists"}), 400
#         user = Organization(
#             name = request_body["name"],
#             email = request_body["email"],
#             password = generate_password_hash(request_body["password"])       
#             )
#         db.session.add(user)
#         db.session.commit()
#         return jsonify({"created": "Thank you for registering", "status": "true"}), 200
    
@api.route("/createResource", methods = ["POST"])
def create_resource():
    if request.method == "POST":
        request_body = request.get_json()
        if not request_body["name"]:
            return jsonify({"message": "Name is required"}), 400
        resource = Resource.query.filter_by(name=request_body["name"]).first()
        if resource: 
            return jsonify({"message": "Resource already exists"}), 400
        resource = Resource(
            name = request_body["name"],
            address = request_body["address"],
            phone = request_body["phone"],
            website = request_body["website"],
            schedule = request_body["schedule"],       
            )
        db.session.add(resource)
        db.session.commit()
        return jsonify({"created": "Thank you for creating a resource!", "status": "true"}), 200