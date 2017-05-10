/*
 *	In The Name Of God
 *	javaSnake Official WebSite
 *	File: code-viewer.js
 *	By  : SMRSAN
 */
S(function(){

	S(".javasnake-code-box-css-3 > pre").each(function(){
		
		var cv     = this,
			lines  = cv.innerHTML.split(/\n/),
			result = "",
			commentML = false,
			brackets  = false,
			quote     = false,
			dquote    = false,
			propBool  = false,
			addSign   = false,
			slcStyle  = "color: #77f",//Selectors Color
			commStyle = "color: #aaa",//Comments  Color
			brckStyle = "color: #fc0",//Brackets  Color
			qteStyle  = "color: #bb0",//Quotes    Color
			dqteStyle = "color: #0b0",//Double Quotes Color
			propStyle = "color: #d0d",//Porperties Color
			addStyle  = "color: #f55",//addSign   Color
			opStyle   = "color: #0cf",//Operators Color
			impStyle  = "color: #f55";// !importants Color
		
		for(var i=0; i<lines.length; i++){//Lines Loop
			
			var ln  = lines[i];
			
			if(commentML){
				
				result += "<span style='" + commStyle + "' >";
				
			} else if(!brackets && !addSign){
				
				result += "<span style='" + slcStyle + "' >";
				
			} else if(addSign){
				
				result += "<span style='" + addStyle + "' >";
				
			} else if(brackets && !propBool){
				
				if(quote){
					
					result += "<span style='" + qteStyle + "' >";
					
				} else if(dquote){
					
					result += "<span style='" + dqteStyle + "' >";
					
				}
				
			} else if(brackets && propBool){//Color Of Properties
				
				result += "<span style='" + propStyle + "' >";
				
			}
			
			for(var j=0; j<ln.length; j++){//Chars Loop
				
				switch(ln[j]){//Check Each Char
					
					case '@':
						
						if(!commentML && !quote && !dquote && !brackets){
							
							if((ln[j+1].toLowerCase() == 'k' &&
							    ln[j+2].toLowerCase() == 'e' &&
							    ln[j+3].toLowerCase() == 'y' &&
							    ln[j+4].toLowerCase() == 'f' &&
							    ln[j+5].toLowerCase() == 'r' &&
							    ln[j+6].toLowerCase() == 'a' &&
							    ln[j+7].toLowerCase() == 'm' &&
							    ln[j+8].toLowerCase() == 'e' &&
							    ln[j+9].toLowerCase() == 's')
								||
							   (ln[j+1].toLowerCase() == 'm' &&
							    ln[j+2].toLowerCase() == 'e' &&
							    ln[j+3].toLowerCase() == 'd' &&
							    ln[j+4].toLowerCase() == 'i' &&
							    ln[j+5].toLowerCase() == 'a')){//keyframes or media
								
								if(ln[j+1].toLowerCase() == 'm' &&
							       ln[j+2].toLowerCase() == 'e' &&
							       ln[j+3].toLowerCase() == 'd' &&
							       ln[j+4].toLowerCase() == 'i' &&
							       ln[j+5].toLowerCase() == 'a'){//media
									
									addSign  = true;
									brackets = false;
									result  += "</span><span style='" + addStyle + "' >@";
									
									result += ln[j+1] + ln[j+2] + ln[j+3] + ln[j+4] + ln[j+5];
									
									j += 5;
									
								} else {//keyframes
									
									addSign  = true;
									brackets = false;
									result  += "</span><span style='" + addStyle + "' >@";
									
									result += ln[j+1] + ln[j+2] + ln[j+3] + ln[j+4] + ln[j+5] + ln[j+6] + ln[j+7] + ln[j+8] + ln[j+9];
									
									j += 9;
									
								}
								
							} else { //Not media Or keyframes
								
								addSign  = false;
								result  += "</span><span style='" + slcStyle + "' >@";
								
							}
							
						} else {
							
							result += "@";
							
						}
						
					break;
					case '{':
						
						if(!commentML && !quote && !dquote){
							
							if(!addSign){
								
								propBool = true;
								brackets = true;
								result += "</span><span style='" + brckStyle + "' >{</span><span style='" + propStyle + "' >";
								
							} else {
								
								propBool = false;
								brackets = false;
								addSign  = false;
								result += "</span><span style='" + brckStyle + "' >{</span><span style='" + slcStyle + "' >";
								
							}
							
						} else {
							
							result += "{";
							
						}
						
					break;
					case '}':
						
						if(!commentML && !quote && !dquote){
							
							brackets = false;
							
							if(propBool){ result += "</span>";propBool = false; }
							
							result += "<span style='" + brckStyle + "' >}</span>";
							
						} else {
							
							result += "}";
							
						}
						
					break;
					case '/':
						
						if(!addSign && !quote && !dquote){
							
							if(!commentML && ln[j+1] == '*'){//Comment Start
								
								commentML = true;
								
								if(!brackets || (brackets && propBool)){
									
									result += "</span><span style='" + commStyle + "' >/";
									
								} else {
									
									result += "<span style='" + commStyle + "' >/";
									
								}
								
							} else if(commentML && ln[j-1] == '*'){//Comment End
								
								commentML = false;
								
								if(!brackets || (brackets && propBool)){
									
									if(!brackets){
										
										result += "/</span><span style='" + slcStyle + "' >";
										
									} else {
										
										result += "/</span><span style='" + propStyle + "' >";
										
									}
									
								} else {
									
									result += "/</span>";
									
								}
								
							} else {
								
								result += "/";
								
							}
							
						} else {
							
							result += "/";
							
						}
						
					break;
					case "'":
						
						if(!commentML && !dquote && brackets && !propBool){
							
							if(!quote){//Quote Start
								
								quote = true;
								result += "<span style='" + qteStyle + "' >'";
								
							} else {//Quote End
								
								//BackSlash Check
								let lastCharNum = 1,
									isSlashFlag = false;
								while(ln[j-lastCharNum] == '\\'){
									
									isSlashFlag = (isSlashFlag)? false:true;
									lastCharNum++;
									
								}
								if(!isSlashFlag){
									quote = false;
									result += "'</span>";
								} else {
									result += "'";
								}
								
							}
							
						} else {
							
							result += "'";
							
						}
						
					break;
					case '"':
						
						if(!commentML && !quote && brackets && !propBool){
							
							if(!dquote){//Quote Start
								
								dquote = true;
								result += '<span style="' + dqteStyle + '" >"';
								
							} else {//Quote End
								
								//BackSlash Check
								let lastCharNum = 1,
									isSlashFlag = false;
								while(ln[j-lastCharNum] == '\\'){
									
									isSlashFlag = (isSlashFlag)? false:true;
									lastCharNum++;
									
								}
								if(!isSlashFlag){
									dquote = false;
									result += '"</span>';
								} else {
									result += '"';
								}
								
							}
							
						} else {
							
							result += '"';
							
						}
						
					break;
					case ':':
						
						if(!commentML && !dquote && !quote && brackets && propBool){
							
							propBool = false;
							result += "</span><span style='" + opStyle + "' >:</span>";
							
						} else {
							
							result += ":";
							
						}
						
					break;
					case ';':
						
						if(!commentML && !dquote && !quote && brackets && !propBool){//Value Condition
							
							propBool = true;
							result += "<span style='" + opStyle + "' >;</span><span style='" + propStyle + "' >";
							
						} else {
							
							result += ";";
							
						}
						
					break;
					case '!':
						
						if(!commentML && !dquote && !quote && brackets && !propBool){//Value Condition
							
							if( ln[j+1].toLowerCase() == 'i' &&
								ln[j+2].toLowerCase() == 'm' &&
								ln[j+3].toLowerCase() == 'p' &&
								ln[j+4].toLowerCase() == 'o' &&
								ln[j+5].toLowerCase() == 'r' &&
								ln[j+6].toLowerCase() == 't' &&
								ln[j+7].toLowerCase() == 'a' &&
								ln[j+8].toLowerCase() == 'n' &&
								ln[j+9].toLowerCase() == 't'){
								
								result += "<span style='" + impStyle + "' >!" + 
											ln[j+1] + ln[j+2] + ln[j+3] + ln[j+4] + ln[j+5] + ln[j+6] + ln[j+7] + ln[j+8] + ln[j+9] +
											"</span>";
								
								j += 9;
								
							} else {
								
								result += "!";
								
							}
							
						} else {
							
							result += "!";
							
						}
						
					break;
					case '&':
						
						if(ln[j+1] == 'l' && ln[j+2] == 't' && ln[j+3] == ';'){
							
							result += "&lt;";
							j += 3;
							
						} else if(ln[j+1] == 'a' && ln[j+2] == 'p' && ln[j+3] == 'o' && ln[j+4] == 's' && ln[j+5] == ';'){
							
							result += "&apos;";
							j += 5;
							
						} else if(ln[j+1] == 'q' && ln[j+2] == 'u' && ln[j+3] == 'o' && ln[j+4] == 't' && ln[j+5] == ';'){
							
							result += "&quot;";
							j += 5;
							
						} else {
							
							result += "&amp;";
							
						}
						
					break;
					case ' ':
						
						result += "&nbsp;";
						
					break;
					case '	':
						
						result += "&nbsp;&nbsp;&nbsp;&nbsp;";
						
					break;
					default:
						
						result += ln[j];
						
					break;
					
					
				}//End Of Switch
				
			}//End Of Chars Loop
			
			if(addSign || propBool || commentML || quote || dquote || !brackets){
				
				result += "</span><br/>";
				
			} else result += "<br/>";
			
		}//End Of Lines Loop
		
		//Enter Codes
		var code_view_css = S(S('$new','div')).attr('class','javasnake-code-view-css-3').html(result).get();
		S(cv).after(code_view_css);
		
		//Put Line Numbers
		var code_line_nums = S(S('$new','div')).attr("class","javasnake-code-line-nums-3").get();
		
		var codeLineNums = 1,
			numsResult   = "";
		for(var i=0; i<lines.length; i++){
			
			numsResult += "<span>" + codeLineNums + "</span>";
			codeLineNums++;
			
		}
		code_line_nums.innerHTML = numsResult;
		
		S(cv)
		.after(code_line_nums);
		
	});
	
});