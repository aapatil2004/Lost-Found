from sqlalchemy import Column, Integer, String, Date, Time, Text, LargeBinary
from database import Base

class FoundItem(Base):
    __tablename__ = "found_items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(255))
    category = Column(String(255))
    date_found = Column(Date)
    time_found = Column(String(255))
    location_found = Column(String(255))
    color = Column(String(255))
    brand_model = Column(String(255))
    special_identifiers = Column(Text)
    description = Column(Text)
    full_name = Column(String(255))
    phone_number = Column(String(255))
    email = Column(String(255))
    image_name = Column(String(255))
    image_type = Column(String(50))
    image_data = Column(LargeBinary)

class LostItem(Base):
    __tablename__ = "lost_items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(255))
    category = Column(String(255))
    date_lost = Column(Date)
    time_lost = Column(String(255))
    location_lost = Column(String(255))
    color = Column(String(255))
    brand_model = Column(String(255))
    special_identifiers = Column(Text)
    description = Column(Text)
    full_name = Column(String(255))
    phone_number = Column(String(255))
    email = Column(String(255))
    image_name = Column(String(255))
    image_type = Column(String(50))
    image_data = Column(LargeBinary)
