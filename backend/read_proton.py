from protonmail import ProtonMail

from SushInnovation.TOKENS import PROTON_MAIL_PASSWORD

username = "privatecoupons@proton.me"


proton = ProtonMail()

try:
    proton.load_session("session_key")
except FileNotFoundError:
    proton.login(username, PROTON_MAIL_PASSWORD)

# Get a list of all messages
messages = proton.get_messages()

for message in messages:
    message = proton.read_message(message)
    print(message.sender.address, message.subject)
    # print(message.body)

proton.save_session("session_key")