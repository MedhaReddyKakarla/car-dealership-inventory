from pydantic import BaseModel, ConfigDict, Field


class VehicleCreate(BaseModel):
    make: str = Field(min_length=1, max_length=100)
    model: str = Field(min_length=1, max_length=100)
    category: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0)
    quantity: int = Field(ge=0)


class VehicleResponse(BaseModel):
    id: int
    make: str
    model: str
    category: str
    price: float
    quantity: int

    model_config = ConfigDict(from_attributes=True)