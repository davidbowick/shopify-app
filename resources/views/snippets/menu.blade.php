<nav class="main-nav">
	@php 
	$current_url = explode('?',$_SERVER['REQUEST_URI'], 2)[0];
	@endphp
	<div class="container flex flex--align-center">
		<ul class="flex">
			<li>
				<a class="{{ $current_url == '/' ? 'active' : '' }}" href="/"><span>My Sales</span></a>
			</li>
			<li>
				<a class="{{ $current_url == '/drafts' ? 'active' : '' }}" href="/drafts"><span>My Draft Orders</span></a>
			</li>
			<li>
				<a class="{{ $current_url == '/new' ? 'active' : '' }}" href="/new"><span>New Draft Order</span></a>
			</li>

		</ul>
		@if (Auth::user())
		<div class="logged-in-user flex flex--align-center">
			<div class="logged-in-user__inner">
				<img src="//www.gravatar.com/avatar/{{ md5( strtolower( trim( Auth::user()->email ) ) ) }}?s=30">
				<span>{{ explode(' ',Auth::user()->name)[0] }}</span>

				<div class="logged-in-user__dropdown">
					<span class="triangle">▲</span>
					<ul class="box">
						<li><a href="/">My Sales</a></li>
						<li><a href="/drafts">My Draft Orders</a></li>
						<li><a href="/new">New Draft Order</a></li>
						<li>
							<form id="form-logout" action="{{ route('logout') }}" method="POST">
								@csrf
								<button type="submit">Log Out</button>
							</form>
						</li>
					</ul>
				</div>
			</div>
		</div>
		@endif
	</div>
</nav>