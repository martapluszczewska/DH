			particlesJS.load('particles-slide-1', 'particles.json')
			particlesJS.load('particles-slide-2', 'particles.json')
			
			var tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			var player;
			var playlist;
			var playlist_size = 0;
			var current_playlist_index = 0;

			function onYouTubeIframeAPIReady() {
				player = new YT.Player('player', {
					height: '0',
					width: '0',
					playerVars: {
						'loop' : 1,
						'autoplay' : 0,
						'listType' : "playlist",
						'list' : "PLIwTA3fr3NRlAt7kmYjYezyNbh5Je_7PD",
					},
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange,
						'onError': onError
					}
				});
			}

			function onError(event) {
				switch(event.data) {
					case 2: 
						console.log("Niepoprawna wartość parametru - ten błąd występuje " + 
									"na przykład wtedy, gdy identyfikator filmu nie zawiera " +
									"11 znaków lub identyfikator filmu zawiera znaki zabronione " +
									"(wykrzyniki i/lub gwiazdki).")
					break
				
					case 5: 
						console.log("Żądany materiał nie może zostać odtworzony w odtwarzaczu " +
									"HTML5 lub wystąpił inny błąd związany z odtwarzaczem HTML5.")
					break

					case 100: 
						console.log("Żądany materiał nie istnieje lub jest oznaczony jako prywatny.")
					break

					case 101: 
						console.log("Właściciel materiału nie zezwala na odtwarzanie w odtwarzaczu " + 
									"osadzonym na stronie.")
					break

					case 150: 
						console.log("Właściciel materiału nie zezwala na odtwarzanie w odtwarzaczu " +
									"osadzonym na stronie.")
					break
				}
			}

			function onPlayerReady(event) {
				console.log("onPlayerReady()");
				event.target.cuePlaylist({listType: "playlist",
										list: "PLIwTA3fr3NRlAt7kmYjYezyNbh5Je_7PD",
										index: 0,
										startSeconds: 0,
										suggestedQuality: "medium"
				});
			}

			var playing = false;
			function onPlayerStateChange(event) {
				switch(event.data) {
					case YT.PlayerState.CUED: 
						playlist = event.target.getPlaylist();
						playlist_size = playlist.length;
						current_playlist_index = 0;

						console.log("Current playlist: " + playlist);
						console.log("Current track id: " + playlist[current_playlist_index]);
						event.target.loadVideoById(playlist[current_playlist_index], 0, "medium")
						
						playing = true;
					break;

					case YT.PlayerState.PLAYING:
						console.log("State: PLAYING\n");
						console.log(playlist);
						playing = true;
					break;
					
					case YT.PlayerState.PAUSED:
						console.log("State: PAUSED\n");
						console.log(playlist);
						playing = false;
					break;

					case YT.PlayerState.ENDED:
						current_playlist_index = (current_playlist_index + 1) % playlist_size;
						console.log("Current track index: " + current_playlist_index);
						console.log("Current track id: " + playlist[current_playlist_index]);
						player.loadVideoById(playlist[current_playlist_index], 0, "medium")
					break;
				}
			}

			$("#play-pause-button").click(function() {
				if(playing == true) {
					player.pauseVideo();
					$('#play-pause-button').attr('src','img/slide-1/play.svg');
				} else {
					player.playVideo();
					$('#play-pause-button').attr('src','img/slide-1/pause.svg');

				}

				playing = !playing;
			});
		
			$("#next-song-button").click(function() {
				current_playlist_index = (current_playlist_index + 1) % playlist_size;
				console.log("Current track index: " + current_playlist_index);
				console.log("Current track id: " + playlist[current_playlist_index]);
				player.loadVideoById(playlist[current_playlist_index], 0, "medium")

				$('#switch-n').attr('src','next.png');
			});

			var mod = function (n, m) {
				var remain = n % m;
				return Math.floor(remain >= 0 ? remain : remain + m);
			};

			$("#previous-song-button").click(function() {
				current_playlist_index = mod(current_playlist_index - 1, playlist_size);
				console.log("Current track index: " + current_playlist_index);
				console.log("Current track id: " + playlist[current_playlist_index]);
				player.loadVideoById(playlist[current_playlist_index], 0, "medium")

				$('#switch-p').attr('src','previous.png');
			});

			$(document).ready(function(){
				$(window).scroll(function(){
					var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

					if($(this).scrollTop() > (1 / 4) * h){
						$("#sun-shield").css("bottom","-50%");
					}
					if($(this).scrollTop() > (3 / 8) * h){
						$("#sun-shield").css("opacity","0");
					}
					if($(this).scrollTop() < (1 / 4) * h){
						$("#sun-shield").css("bottom","0%").css("opacity","1");
					}
				});
			});

		var slider = document.querySelector('#synthwave-bands-carousel');
    	var carousel = new Wallop(slider);

    	setInterval(function() {
    		carousel.next()
    	}, 5000);