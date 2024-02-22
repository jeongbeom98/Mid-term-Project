from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel

class Todo(BaseModel):  # This class defines the structure of your todo item
    title: str
    description: str
    completed: bool = False

todo_router = APIRouter()

todo_list = []

@todo_router.post("/todos", response_model=Todo)
async def add_todo(todo: Todo) -> dict:
    todo_dict = todo.dict()
    todo_dict['id'] = len(todo_list) + 1  # Assign a unique ID
    todo_list.append(todo_dict)
    return todo_dict

@todo_router.get("/todos")
async def get_todos() -> dict:
    return {"todos": todo_list}

@todo_router.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo: Todo) -> dict:
    for index, stored_todo in enumerate(todo_list):
        if stored_todo['id'] == todo_id:
            update_todo_dict = todo.dict()
            update_todo_dict['id'] = todo_id
            todo_list[index] = update_todo_dict
            return update_todo_dict
    raise HTTPException(status_code=404, detail="Todo not found")

@todo_router.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int) -> dict:
    for index, stored_todo in enumerate(todo_list):
        if stored_todo['id'] == todo_id:
            del todo_list[index]
            return {"msg": "Todo successfully deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")
