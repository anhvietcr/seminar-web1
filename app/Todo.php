<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    /***
     * @var string
     */
    protected $table = "todo";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'email', 'detail', 'status', 'created_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];
}
