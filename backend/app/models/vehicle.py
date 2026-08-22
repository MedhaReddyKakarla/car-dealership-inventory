from sqlalchemy import Column, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship

from app.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    make = Column(
        String(100),
        nullable=False,
    )

    model = Column(
        String(100),
        nullable=False,
    )

    category = Column(
        String(100),
        nullable=False,
    )

    price = Column(
        Numeric(10, 2),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
    )

    owner = relationship(
        "User",
        back_populates="vehicles",
    )