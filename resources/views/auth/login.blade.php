@extends('shopify-app::layouts.default')

@section('styles')
<link rel="stylesheet" href="{{ mix('/css/app.css') }}" >
@endsection 


@section('content')
<div class="container">
    <hr class="hr--invisible">
    <form method="POST" action="{{ route('login') }}" class="form--admin-login">
        <h1>Login</h1>
        @csrf
        <div class="field">
            <label for="email">{{ __('E-Mail Address') }}</label>
            
            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>

        <div class="field">
            <label for="password">{{ __('Password') }}</label>

            
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

            @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
            
        </div>

        <div class="field">

            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                <label class="form-check-label" for="remember">
                    {{ __('Remember Me') }}
                </label>
            </div>
            
        </div>

        <div class="field">
            <button type="submit" class="btn btn-primary">
                {{ __('Login') }}
            </button>
        </div>
        <p>
            Not registered yet? <a href="{{ route('register') }}" class="btn-link">{{ __('Register now') }}</a>
        </p>
    </form>

</div>
@endsection
