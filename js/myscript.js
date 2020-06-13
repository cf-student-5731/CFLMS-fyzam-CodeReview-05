$(document).ready(function () {

	let data = JSON.parse(movies);
	let swapped = true;
	
	// LET IT SORT
	function sort_data(sort_direction){
		let direction = sort_direction
		while(swapped){
			swapped = false;
			if(direction == 'down'){
				for(let j = 0; j < data.length-1; j++){
					if(data[j].likes < data[j+1].likes){
						let data_temp = data[j];
						data[j] = data[j+1]
						data[j+1] = data_temp;
						swapped = true;
					};
				};
			};

			if(direction == 'up'){
				for(let j = 0; j < data.length-1; j++){
					if(data[j].likes > data[j+1].likes){
						let data_temp = data[j];
						data[j] = data[j+1]
						data[j+1] = data_temp;
						swapped = true;
					};
				};
			};
		};
	};

	// SORT MENU
	function activate_data_menu(){
		$('#sort_descending').on('click', function(){
			swapped = true;
			sort_data('down');
			build_document();
		});

		$('#sort_ascending').on('click', function(){
			swapped = true;
			sort_data('up');
			build_document();
		});

		$('#remove_likes').on('click', function(){
			swapped = true;
			for (i = 0; i< data.length; i++){
				data[i].likes = 0;
			}
			sort_data('up');
			build_document();
		});

		$('#random_like').on('click', function(){
			for (i = 0; i< data.length; i++){
				data[i].likes = Math.floor((Math.random() * 31)-10);
			}
			build_document();
		});

		$('#save_likes').on('click', function(){
			localStorage.setItem('data', JSON.stringify(data));
			alert('Data Saved to Local Storage!');
		});

		$('#load_likes').on('click', function(){
			if (localStorage.getItem('data') === null){
				alert('No Data found in Local Storage!');
			}
			else{	
				data = JSON.parse(localStorage.getItem('data'));
				build_document();
				alert('Data Loaded from Local Storage!');
			};
		});

		$('#clear_likes').on('click', function(){
			localStorage.removeItem('data');
			alert('Data Removed from Local Storage!');
		});
	};

	// COLOR MENU
	function activate_color_menu(){
		$('#messy_style').on('click', function(){
			document.getElementsByTagName("link").item(0).remove();
			let newlink = document.createElement("link");
			newlink.setAttribute("rel", "stylesheet");
			newlink.setAttribute("type", "text/css");
			newlink.setAttribute("href", "./css/messed_up_style.css");
			document.getElementsByTagName("head").item(0).prepend(newlink);
		});

		$('#standard_style').on('click', function(){
			document.getElementsByTagName("link").item(0).remove();
			let newlink = document.createElement("link");
			newlink.setAttribute("rel", "stylesheet");
			newlink.setAttribute("type", "text/css");
			newlink.setAttribute("href", "./css/mystyle.css");
			document.getElementsByTagName("head").item(0).prepend(newlink);
		});


	};

	// BUILD THE MAIN FRAME
	function build_document(){
		$('#main_wrapper').empty();
		for (let i = 0; i < data.length; i++) {
			$('#main_wrapper').append(`
				<div class="movie_wrapper">

					<div class="movie_picture">
						<img src="${data[i].image}" alt="${data[i].name}">
					</div>

					<div class="movie_text">
						<div>
							<div class="movie_name">
								<p>${data[i].name}</p>
							</div>

							<div class="movie_description">
								<p>${data[i].description}</p>
							</div>
						</div>

						<div class="like_area">
							<div class="dis_like_line dis_like_line_${i}">Dislike <div class="fa fa-thumbs-down"></div></div>
							
							<div class="like_line like_line_${i}">Like <div class="fa fa-thumbs-up"></div></div>
							<div class="likes like_${i}">${data[i].likes}</div>

							
						</div>

						
							
						

					</div>
				</div>
			`);
			
			$(`.like_line_${i}`).on(`click`, function(){
				data[i].likes++;
				$(`.like_${i}`).text(data[i].likes);
				
			});

			$(`.dis_like_line_${i}`).on(`click`, function(){
				data[i].likes--;
				$(`.like_${i}`).text(data[i].likes);
				
			});
		};
	};

	// START THE SITE
	activate_data_menu();
	activate_color_menu();
	build_document();
});