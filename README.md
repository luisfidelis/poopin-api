# poopin-api
 ==========
 Describe your poop places or search places near to you.

API
---------------------------------------------
* POST /user/save

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
			_id  : string
		}]
   }
  	``` 	
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
			_id  	   : string,
			name       : string,
			nickname   : string,
			birthDate  : string || dd/mm/yyyy,
			email      : atring
		}]
   }
   	```
* GET /toilet/getAll

  	Response
  	```
   { 
   	error    : bool,
		message  : string,
		data     : [{
			_id	    : string,
			description : string,
			address     : string,
			city	    : string,
			state	    : string,
			country	    : string,
			lat	    : string,
			lng	    : string,
			avaliations: [
				{
				    _id		: string,
				    toiletId	: string,
				    userId      : string,
				    stars	: integer,
				    observation : string
				}
			]
		}]
   }
  	```   	 	
* POST /toilet/save

  	Parameters
  	```
   { 
   	description : string,
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
	



