from protonmail import ProtonMail
# pip install protonmail-api-client

from SushInnovation.TOKENS import PROTON_MAIL_PASSWORD

username = "privatecoupons@proton.me"
proton = ProtonMail()

def login():
    try:
        proton.load_session("session_key")
    except FileNotFoundError:
        proton.login(username, PROTON_MAIL_PASSWORD)

def read_messages():
    # Get a list of all messages
    messages = proton.get_messages()

    return [proton.read_message(msg, mark_as_read=False) for msg in messages]


if __name__ == "__main__":
    login()
    read_messages()

    proton.save_session("session_key")