from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100))
    price = db.Column(db.Float)
    description = db.Column(db.String(2000))
    category = db.Column(db.String(100))
    state = db.Column(db.String(50))
    department = db.Column(db.String(100))
    location_reference = db.Column(db.String(100))
