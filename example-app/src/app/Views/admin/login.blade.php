<h1>Admin / Login form</h1>
<form action="/login" method="post">
    @csrf
    User name: <input type="text" name="username" id=""><br>

    @error('username')
        <div style="color: red;">{{ $message }}</div>
    @enderror
    Passwork: <input type="password" name="password" id=""><br>
    @error('password')
        <div style="color: red;">{{ $message }}</div>
    @enderror
    <button type="submit">Login</button>
</form>
