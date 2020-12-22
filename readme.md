# Alumni Mitglieder Verwaltungs Tool

## Development

### Local database

Execute command
```
docker run -e MYSQL_DATABASE=amvt -e MYSQL_USER=amvt -e MYSQL_PASSWORD=amvt -e MYSQL_ROOT_PASSWORD=amvt --name amvt_mariadb -p 3306:3306 mariadb
```
to setup a local database for development purpose.
