setInterval(()=>{ 
	main()
}, 700);

function main(){
	let game_matrix=getMatrixGame()
	let max_hold=0
	let best_direction=''

	if(hamGiaLap(game_matrix,'up') > max_hold){
		max_hold=hamGiaLap(game_matrix,'up')
		best_direction='up'
	}
	if(hamGiaLap(game_matrix,'down') > max_hold){
		max_hold=hamGiaLap(game_matrix,'down')
		best_direction='down'
	}
	if(hamGiaLap(game_matrix,'left') > max_hold){
		max_hold=hamGiaLap(game_matrix,'left')
		best_direction='left'
	}
	if(hamGiaLap(game_matrix,'right') > max_hold){
		max_hold=hamGiaLap(game_matrix,'right')
		best_direction='right'
	}

	if(hamGiaLap(game_matrix,'up')==hamGiaLap(game_matrix,'down')&&
		hamGiaLap(game_matrix,'down')==hamGiaLap(game_matrix,'left')&&
		hamGiaLap(game_matrix,'left')==hamGiaLap(game_matrix,'right')
		){
		
		switch(randomInt(0,4)){
			case 0:
				best_direction='up'
				break;
			case 1:
				best_direction='down'
				break;
			case 2:
				best_direction='left'
				break;
			case 3:
				best_direction='right'
				break;
		}
	}

	hamMoveArrayKeyboard(best_direction)
}

function getMatrixGame(){
	let game_matrix;
	let all_tile;

	all_tile=document.querySelectorAll('.tile')
	//4x4
	game_matrix=[
		['','','',''],
		['','','',''],
		['','','',''],
		['','','','']
	]

	all_tile.forEach((e)=>{
		class_contain_value=e.classList[1];
		let value=class_contain_value.split('-')[1];

		class_contain_position=e.classList[2];
		let col_position=class_contain_position.split('-')[2];
		let row_position=class_contain_position.split('-')[3];

		//console.log({value,col_position,row_position})

		game_matrix[row_position-1][col_position-1]=value;

	})

	// console.table(game_matrix)
	return game_matrix

}


function randomInt(min,max){
	return Math.round(Math.random()*(max-min)+min) 
}

function hamMoveArrayKeyboard(direction){
	switch(direction){
	    case 'left':
	    	var evt = new KeyboardEvent('keydown', { 'keyCode': 37, 'which': 37 });
    		document.dispatchEvent(evt);
	    	break
	    case 'up':
	    	var evt = new KeyboardEvent('keydown', { 'keyCode': 38, 'which': 38 });
    		document.dispatchEvent(evt);
	    	break
	    case 'right':
	    	var evt = new KeyboardEvent('keydown', { 'keyCode': 39, 'which': 39 });
    		document.dispatchEvent(evt);
	    	break
	    case 'down':
	    	var evt = new KeyboardEvent('keydown', { 'keyCode': 40, 'which': 40 });
    		document.dispatchEvent(evt);
	    	break
	}
	
}
function hamRutGonArray1DTheoRule2048(input){
	if(input.length===0) return input
	a=[...input];
	// a=[2,1,1,1,2,2,3,4,5,7]
	b=[a[0]]

	let isCheck=true;
	for (let i=1;i<=a.length-1;i++){
		if(isCheck){
			if(a[i]!==a[i-1]){
				b.push(a[i])
			}else{
				isCheck=false;
			}	
		}else{
			b.push(a[i])
			isCheck=true
		}

	}
	return b; 
}
function hamGiaLap(game_matrix,direction){
	let game_matrix_test=[[...game_matrix[0]],[...game_matrix[1]],[...game_matrix[2]],[...game_matrix[3]]]
	let game_matrix_test_transpose=[[...game_matrix[0]],[...game_matrix[1]],[...game_matrix[2]],[...game_matrix[3]]]
	switch(direction){
	    case 'left':
			//day tat ca sang trai
			for(let iHang=0;iHang<4;iHang++){
				let row=game_matrix_test[iHang];

				var new_row_1=[] //value khac 0
				var new_row_2=[] //value bang 0
				row.forEach((e)=>{
					if(e) new_row_1.push(e)
					else new_row_2.push('')
				})
				//rut gon array
				new_row_1_shorten=hamRutGonArray1DTheoRule2048(new_row_1)
				//console.log({new_row_1_shorten,new_row_1})
				for(let ishorten=0;ishorten<new_row_1.length-new_row_1_shorten.length;ishorten++){
					new_row_2.push('')
				}
				row=[...new_row_1_shorten,...new_row_2]
				game_matrix_test[iHang]=row

			}
			break
		case 'right':
			//day tat ca sang phai
			for(let iHang=0;iHang<4;iHang++){
				let row=game_matrix_test[iHang];

				var new_row_1=[] //value khac 0
				var new_row_2=[] //value bang 0
				row.forEach((e)=>{
					if(e) new_row_1.push(e)
					else new_row_2.push('')
				})
				//rut gon array
				new_row_1_shorten=hamRutGonArray1DTheoRule2048(new_row_1)
				//console.log({new_row_1_shorten,new_row_1})
				for(let ishorten=0;ishorten<new_row_1.length-new_row_1_shorten.length;ishorten++){
					new_row_2.push('')
				}

				row=[...new_row_2,...new_row_1_shorten]
				game_matrix_test[iHang]=row

			}
			break

		case 'up':
			//day tat ca len tren
			for(let iCot=0;iCot<4;iCot++){
				let col=game_matrix_test.map((row)=> { return row[iCot]; });

				var new_col_1=[] //value khac 0
				var new_col_2=[] //value bang 0
				col.forEach((e)=>{
					if(e) new_col_1.push(e)
					else new_col_2.push('')
				})
				//rut gon array
				new_col_1_shorten=hamRutGonArray1DTheoRule2048(new_col_1)
				// console.log({new_col_1_shorten,new_col_1})

				for(let ishorten=0;ishorten<new_col_1.length-new_col_1_shorten.length;ishorten++){
					new_col_2.push('')
				}

				col=[...new_col_1_shorten,...new_col_2]
				game_matrix_test_transpose[iCot]=col

			}
			game_matrix_test=transpose(game_matrix_test_transpose)

			break

		case 'down':
			//day tat ca xuong duoi
			for(let iCot=0;iCot<4;iCot++){
				let col=game_matrix_test.map((row)=> { return row[iCot]; });

				var new_col_1=[] //value khac 0
				var new_col_2=[] //value bang 0
				col.forEach((e)=>{
					if(e) new_col_1.push(e)
					else new_col_2.push('')
				})

				//rut gon array
				new_col_1_shorten=hamRutGonArray1DTheoRule2048(new_col_1)
				// console.log({new_col_1_shorten,new_col_1})
				for(let ishorten=0;ishorten<new_col_1.length-new_col_1_shorten.length;ishorten++){
					new_col_2.push('')
				}

				col=[...new_col_2,...new_col_1_shorten]
				game_matrix_test_transpose[iCot]=col

			}
			game_matrix_test=transpose(game_matrix_test_transpose)

			break
	}

	return calc_total_hold(game_matrix_test)

}
function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
}


function calc_total_hold(game_matrix){
	return game_matrix.reduce((total_hold,row)=>{
	total_hold_each_row=row.reduce((total,e)=>{
		if(!e) return total+1
		else return total
	},0)

	return total_hold+total_hold_each_row
	},0)
}
