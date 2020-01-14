<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('shopify-app.app_name') }}</title>
        
        @yield('styles')
    </head>

    <body>
        <div class="app-wrapper">
            <div class="app-content">
                <main role="main">
                    @yield('content')
                </main>
            </div>
        </div>

        @if(ShopifyApp::shop() and config('shopify-app.appbridge_enabled') and Auth::user())
            <script src="https://unpkg.com/@shopify/app-bridge"></script>
            <script>
                var AppBridge = window['app-bridge'];
                var createApp = AppBridge.default;
                var app = createApp({
                    apiKey: '{{ config('shopify-app.api_key') }}',
                    shopOrigin: '{{ ShopifyApp::shop()->shopify_domain }}',
                    forceRedirect: true,
                });
                console.log("We're in");
            </script>
        @endif
        {{-- @yield('scripts') --}}
        <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="{{ mix('/js/app.js') }}"></script>
        
    </body>
</html>