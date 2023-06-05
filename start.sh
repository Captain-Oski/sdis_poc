# Attempt to install h3 through pgnx 
# Failing for now
apt update &&
apt install pip -y &&
apt install cmake -y &&
apt update &&
pip install pgxnclient &&