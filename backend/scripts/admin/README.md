# Scripts for managing admins
## Add new admin
To add an admin with given username and password run 

```npm run add_admin username={username} password={password}```.

If you want to generate a cryptographically random password run 

```npm run add_admin username={username} generate={password length}```.

## Change password
To change the password of an admin run 

```npm run change_password username={username} password={password}```.

If you want to generate a cryptographically random password run 

```npm run change_password username={username} generate={password length}```.

## Delete an admin
To delete an admin run

```npm run delete_admin username={username}```.
