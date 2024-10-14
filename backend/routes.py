from flask import Blueprint, request, jsonify
from models import db, Product

routes = Blueprint('routes', __name__)

@routes.route('/upload-product', methods=['POST'])
def upload_product():
    data = request.json
    new_product = Product(
        product_name=data['productName'],
        price=data['price'],
        description=data['description'],
        category=data['category'],
        state=data['state'],
        department=data['department'],
        location_reference=data['locationReference']  # Este campo debe ser enviado desde el frontend
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Producto guardado correctamente"}), 201
