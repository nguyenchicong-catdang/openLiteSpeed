# run wsl
cd ~/openLiteSpeed/VD1
# pwd
/home/cong/openLiteSpeed/VD1
# open lite speed
sudo /usr/local/lsws/bin/lswsctrl start

# web
localhost:8888

# admin
localhost:7080

# log 
tail /usr/local/lsws/logs/error.log

# mysql
sudo service mysql start

SHOW VARIABLES LIKE 'port';

sudo service mysql restart

mysql -u root -p

sudo service mysql status
