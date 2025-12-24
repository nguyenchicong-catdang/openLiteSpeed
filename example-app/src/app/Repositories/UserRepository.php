<?php

namespace SrcApp\Repositories;

use SrcApp\Contracts\UserRepositoryInterface;
use SrcApp\Models\LoginModel;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Dùng Dependency Injection để nạp Model vào
     */
    public function __construct(
        protected LoginModel $model
    ) {}

    public function getAllUsers()
    {
        return $this->model->all();
    }

    public function findById($id)
    {
        return $this->model->findOrFail($id);
    }
}
