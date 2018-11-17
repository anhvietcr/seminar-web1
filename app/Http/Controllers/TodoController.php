<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
    /***
     * TodoController constructor.
     */
    public function __construct()
    {

    }

    public function listAllByEmail(Request $request)
    {
        // valid email
        if (!isset($request['email']))
            return 0;

        // valid items
        $items = Todo::all();
        if (count($items) < 1)
            return 0;

        // get list items
        $email = $request['email'];
        $todos = Todo::where('email', $email)->get();

        return json_encode($todos);
    }

    public function addItemByEmail(Request $request)
    {
        $item = $request['item'];
        if (!isset($item['email']))
            return 0;

        $email = $item['email'];
        $detail = $item['detail'];
        $timer = $item['created_at'];

        $id = Todo::insertGetId([
            'email' => $email,
            'detail' => $detail,
            'status' => 1,
            'created_at' => $timer,
        ]);

        return json_encode(compact('id'));
    }

    public function updateStatusById(Request $request)
    {
        if (!isset($request['id']))
            return 0;

        // get Item by ID
        $id = $request['id'];
        $item = Todo::where('id', $id)->first();

        // toggle status
        $status = $item['status'] ? 0 : 1;

        // update status
        Todo::where('id', $id)->update(['status' => $status]);

        return 1;
    }
}
