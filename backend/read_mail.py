from protonmail import ProtonMail

from TOKENS import PROTON_MAIL_PASSWORD
# pip install protonmail-api-client

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
    messages = read_messages()

    print(messages[0].subject)

    proton.save_session("session_key")