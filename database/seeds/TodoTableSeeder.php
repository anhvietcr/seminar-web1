<?php

use Illuminate\Database\Seeder;

class TodoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todo')->insert([
           'email' => 'anhvietcr20@gmail.com',
           'detail' => str_random(15),
           'status' => rand(0, 1)
        ]);
    }
}
