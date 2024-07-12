gs.log ('Time Zone Setup - starting');

var lookupState = 'no state';
var removeDoubleSpace = '';
var listZones = '';
var newZone = 'US/Central';

var recLoc = new GlideRecord('cmn_location');
recLoc.addEncodedQuery('name!=NULL^parent=e415c738695a5488535da893e4257932^time_zone=');
// recLoc.addQuery('sys_id', '90b32ad9db1d6a40984a5ecaae9619a9');
recLoc.query();

while (recLoc.next())
{
	
	newZone = 'US/Central';
	lookupState = 'no state';
	
	if (recLoc.state != '') // there is a state in the field, so use it
	{
		lookupState= recLoc.state;
	}
	else // try to get state from location name
	{
		removeDoubleSpace = recLoc.name.toString().split('  ').join(' ');
		
		if (removeDoubleSpace.substring(7, 10) == ' - ')
		{
			lookupState = removeDoubleSpace.substring(10,12);
		}
		
		if (lookupState != 'no state')
		{
			// Atlantic
			// No US states are in AST
			
			// Eastern
			listZones = 'ME,VT,MI,IN,OH,PA,NJ,NY,DE,MD,DC,VA,WV,KY,NC,SC,GA,FL';
			inZone = listZones.indexOf(lookupState);

			if (inZone > 0)
			{
				gs.log ('Time Zone Setup - New zone: Eastern');
				newZone = 'US/Eastern';
			}
			
			// Central
			listZones = 'WI,IL,TN,AL,LA,TX,OK,KS,NE,SD,ND';
			inZone = listZones.indexOf(lookupState);
			
			if (inZone > 0)
			{
				gs.log ('Time Zone Setup - New zone: Central');
				newZone = 'US/Central';
			}
			
			// Mountain
			listZones = 'MT,WY,CO,NM,AZ,UT,ID';
			inZone = listZones.indexOf(lookupState);
			
			if (inZone > 0)
			{
				gs.log ('Time Zone Setup - New zone: Mountain');
				newZone = 'US/Mountain';
			}

			// Pacific
			listZones = 'WA,OR,NV,CA';
			inZone = listZones.indexOf(lookupState);
			
			if (inZone > 0)
			{
				gs.log ('Time Zone Setup - New zone: Pacific');
				newZone = 'US/Pacific';
			}
			
			// Alaska
			listZones = 'AK';
			inZone = listZones.indexOf(lookupState);
			
			if (inZone > 0)
			{
				gs.log ('Time Zone Setup - New zone: Alaska');
				newZone = 'US/Alaska';
			}
			
			// Hawaii
			var listZones = 'HI';
			inZone = listZones.indexOf(lookupState);
			
			if (inZone > 0)
			{
				gs.log ('Time Zone Setup - New zone: Hawaii');
				newZone = 'US/Hawaii';
			}
		}
	}
	
	if (newZone != '')
	{
		gs.log ('Time Zone Setup - Setting TZ to ' + newZone + ' for '+recLoc.name);
		recLoc.time_zone = newZone;
		recLoc.update();
	}
}

gs.log('Time Zone Setup - All done');