from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from todo import todo_router

app = FastAPI()

# Setup CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include the todo_router with CRUD operations for Todo items
app.include_router(todo_router, prefix="/api", tags=["Todo"])

# Serve all static files from the directory named "static"
app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.get("/")
async def welcome() -> dict:
    return {"message": "Welcome to TaskMaster! Navigate to /docs for the API documentation."}
