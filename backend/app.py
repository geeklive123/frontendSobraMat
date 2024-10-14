from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # Permitir que el frontend React pueda hacer peticiones a Flask

# Configurar la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Definir modelo para los productos
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100))
    price = db.Column(db.Float)
    description = db.Column(db.String(2000))
    category = db.Column(db.String(100))
    state = db.Column(db.String(50))
    department = db.Column(db.String(100))
    location_reference = db.Column(db.String(100))

# Crear la base de datos
with app.app_context():
    db.create_all()

# Ruta para la página de inicio
@app.route('/')
def home():
    return "Bienvenido a la API de SobraMat!"

# Ruta para recibir los datos desde React
@app.route('/upload-product', methods=['POST'])
def upload_product():
    data = request.json
    new_product = Product(
        product_name=data['productName'],
        price=data['price'],
        description=data['description'],
        category=data['category'],
        state=data['state'],
        department=data['department'],
        location_reference=data['locationReference']  # Asegúrate de que el frontend envíe este campo
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Producto guardado correctamente"}), 201

if __name__ == '__main__':
    app.run(debug=True)
