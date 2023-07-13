<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shortage extends Model
{
    use HasFactory;
    protected $fillable = [
        'shortage_url', 'full_url'
    ];

    public function scopeCode($query, $agrs = [])
    {
        return $query->where('shortage_url', $agrs['shortage_url']);
    }
    public function scopeId($query, $agrs = [])
    {
        return $query->where('id', $agrs['id']);
    }
    public function scopeMy($query, $agrs = [])
    {
        if ($agrs['group_id'] != User::ADMIN) {
            return $query->where('created_by', $agrs['id']);
        }
    }
}
