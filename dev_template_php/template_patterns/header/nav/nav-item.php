<!-- dev_template_php/template_patterns/header/nav/nav-item.php -->
<?php 
$arrNavItem = [
    "#home" => "Home",
    "#about" => "About",
];
$arrNavItemDropdown = [
    "#/" => [
        "Dropdown1" => [
            "#/ac1" => "Ac1",
            "#/ac11" => "Ac11"
        ]
    ],
    "#/2" => [
        "Dropdown2" => [
            "#/ac2" => "Ac2",
            "#/ac22" => "Ac22",
            "dropdown-divider" => "<li><hr class=\"dropdown-divider\"></li>",
            "#/ac222" => "Ac222",
        ]
    ]
]


?>
<!-- nav-tem -->
<?php foreach($arrNavItem as $link => $text): ?>
<li class="nav-item">
    <a class="nav-link active" aria-current="page" href="<?=$link ?>"><?=$text?></a>
</li>
<?php endforeach; ?>

<!-- nav-item dropdown -->

<?php foreach($arrNavItemDropdown as $link => $dropdown_data): ?>
<li class="nav-item dropdown">
    <?php $dropdown_name = array_key_first($dropdown_data); ?>
    <a class="nav-link dropdown-toggle" href="<?=$link?>" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <!-- "Dropdown2" -> key: $dropdown_data -->
        <?=$dropdown_name?>
    </a>
    <!-- loop $dropdown_data-->
    <ul class="dropdown-menu">
        <?php $dropdown_items =  $dropdown_data[$dropdown_name]; ?>
        <?php $i=0; foreach($dropdown_items as $dropdown_link => $dropdown_value): ?>
        <!-- dropdown-divider -->
        <?php if ($dropdown_link == "dropdown-divider"): ?>
        <?=$dropdown_value ?>
        <?php continue; ?>
        <?php endif; ?>
        <!-- loop li a -->
        <li><a class="dropdown-item" href="<?=$dropdown_link?>"><?=$dropdown_value?></a></li>
        <!-- <?=$i?> -->
        <!-- xu ly i neu get mang -->
        <?php $i++; endforeach; ?>
    </ul>
</li>
<?php endforeach; ?>