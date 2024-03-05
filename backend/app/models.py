from pydantic import BaseModel, Field, validator

class Todo(BaseModel):
    id: int = Field(default=None, alias="_id")
    title: str = Field(..., min_length=1, max_length=50, description="The title of the todo item")
    description: str = Field(..., min_length=1, description="The description of the todo item")
    completed: bool = Field(default=False, description="The completion status of the todo item")

    # Separate validators for title and description
    @validator('title')
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError("title must not be empty or whitespace")
        return v

    @validator('description')
    def description_not_empty(cls, v):
        if not v.strip():
            raise ValueError("description must not be empty or whitespace")
        return v
