from dotenv import load_dotenv

from src import create_app

# if __name__ == '__main__':
load_dotenv()
app = create_app()
