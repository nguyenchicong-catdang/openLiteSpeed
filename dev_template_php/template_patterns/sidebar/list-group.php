<!-- dev_template_php/template_patterns/sidebar/list-group.php -->
<?php
$arrListGroup = [
  "#1" => "value 1",
  "#2" => "value 2",
];
?>
<div class="list-group">
    <?php foreach($arrListGroup as $link => $text): ?>
    <a href="<?=$link?>" class="list-group-item list-group-item-action list-group-item-primary"><?=$text?></a>
    <?php endforeach; ?>
</div>