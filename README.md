# poopin-api
 ==========
 Describe your poop places or search places near to you.

API
---------------------------------------------
User /user
* POST /save

  	Parameters
  	```
   { 
   	name       : string,
		nickname   : string,
		birthDate  : string || dd/mm/yyyy,
		email      : atring,
		password   : string 
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : [{
			_id  	    : string,
			accessToken : string
		}]
   }
  	``` 	
   Obs.: Creates a new user.
* PUT /save
	<br />
	Header
	```
   { 
   	Authorization        : accessToken
   }
  	``` 
  	Parameters
  	```
   { 
   	id         : string,
   	name       : string,
		nickname   : string,
		birthDate  : string || dd/mm/yyyy,
		email      : atring,
		password   : string 
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : [{
			_id  : string
		}]
   }
  	``` 	
   Obs.: Updates an user.
* POST /user/login

  	Parameters
  	```
   { 
   	email      : string,
		password   : string 
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : [{
			_id  	    : string,
			name        : string,
			accessToken : string
			nickname    : string,
			birthDate   : string || dd/mm/yyyy,
			email       : atring
		}]
   }
   	```
Toilet /toilet/
* GET /getAll
	<br />
	Header
	```
   { 
   	Authorization        : accessToken
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : [{
			_id	    : string,
			description : string,
			title       : string,
			address     : string,
			city	    : string,
			state	    : string,
			country	    : string,
			lat	    : string,
			lng	    : string,
			avaliations: [
				{
					id		: string,
				    	toiletId	: string,
				    	stars		: integer,
				    	observation 	: string,
				    	userId      	: {
						_id      : string,
						name     : string,
						nickname : string
				    	}	
				}
			],
			userId : {
				_id      : string,
				name     : string,
				nickname : string
			}
		}]
   }
  	```   	 	
* POST /save
	<br />
	Header
	```
   { 
   	Authorization        : accessToken
   }
  	``` 
  	Parameters
  	```
   { 
   	description : string,
		title       : string,
		address     : string,
		city        : string,
		state       : string,
		country     : string,
	    	lat         : string,
	    	lng         : string,
	    	userId      : string,
	    	avaliations : [{
	    		stars       : integer,
            	observation : string
		}] 
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : []
   }
  	``` 	
   Case "lat" and "lng" are empty the API will request the toilet coordinates with geocoder API.
   Case "lat" and "lng" aren't empty the API will request the toilet address info with geocorder API (reverse search).
	
Avaliation /avaliation/
* GET /user/{userId}
	<br />
	Header
	```
   { 
   	Authorization        : accessToken
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : [{
			userId      : string,
			stars       : integer,
			observation : string
			toiledId    : {
				description : string,
				title       : string,
				address     : string,
				city	    : string,
				state	    : string,
				country	    : string,
				lat	    : string,
				lng	    : string,
				userId      : string
			}
		}]
   }
  	``` 
	
* POST /save
	<br />
	Header
	```
   { 
   	Authorization        : accessToken
   }
  	``` 
	Parameters
  	```
   { 
   	userId      : string,
		toiletId    : string,
		stars       : integer,
		observation : string
   }
  	``` 
  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : []
   }
  	``` 	


