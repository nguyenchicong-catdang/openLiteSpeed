<p>Admin dashboard</p>
<form action="{{ route('logout') }}" method="POST">
    @csrf
    <button type="submit">Đăng xuất</button>
</form>
