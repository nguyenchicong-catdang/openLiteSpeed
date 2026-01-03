# Chuyển đổi JSON sang HTML bằng PHP
composer require nadar/quill-delta-to-html
# Sử dụng trong Controller hoặc Model:
```bash
use Nadar\QuillDeltaToHtml\Converter;

public function getHtmlContentAttribute()
{
    if (!$this->content) return '';

    // $this->content đã được cast thành array nhờ protected $casts
    $dot = new Converter($this->content['ops']);
    return $dot->convert();
}
```
# Hiển thị ngoài Blade:
```bash
<div class="post-item">
    <h2>{{ $post->title }}</h2>
    <div class="content">
        {!! $post->html_content !!}
    </div>
</div>
```
## Cách 2: Render bằng JS tại Client (Nhẹ Server nhưng không tốt cho SEO)
```bash
@foreach($posts as $post)
    <div class="post">
        <h3>{{ $post->title }}</h3>
        <div id="editor-{{ $post->id }}"></div>
    </div>

    <script>
        // Dữ liệu JSON từ Laravel
        var delta = {!! $post->content !!}; 
        
        // Khởi tạo Quill ở chế độ readOnly
        var quill = new Quill('#editor-{{ $post->id }}', {
            readOnly: true,
            theme: 'bubble',
            modules: { toolbar: false }
        });

        // Đổ dữ liệu Delta vào
        quill.setContents(delta);
    </script>
@endforeach
```
