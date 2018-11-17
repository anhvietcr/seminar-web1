@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="jumbotron" style="background-color: #FEFEFE; border-radius: 20px; box-shadow: #c8cacc 0px 0px 9px 0px">
                <meta name="csrf-token" content="{{ csrf_token() }}">
                <div class="before-add row" style="justify-content: center">
                    <div class="intro col-xs-6 col-sm-6 col-md-8">
                        <span id="title">My Todo List </span>
                        <br>
                        <span id="today"></span>
                    </div>
                    <div class="schema col-xs-6 col-sm-6 col-md-4">
                        <input type="checkbox" name="add" id="add">
                        <label for="add" id="label-text"></label>
                    </div>
                </div>
                <div class="after-add row" style="justify-content: center">
                    <div class="text col-xs-12 col-sm-6 col-md-6 ">
                        <div class="form-group">
                            <input type="text" class="form-control" id="content" placeholder="Doing . . ." required>
                        </div>
                    </div>
                    <div class="action col-xs-12 col-sm-5 col-md-5 col-lg-5">
                        <div class="row" style="justify-content: center">
                            <div class="col-xs-6 col-sm-5 col-md-5 col-lg-5" style="width: 50%">
                                <button class="btn btn-success btn-block" id="insert"><i class="fas fa-check-circle fa-2x"></i></button>
                            </div>
                            <div class="col-xs-6 col-sm-5 col-md-5 col-lg-5" style="width: 50%">
                                <button class="btn btn-danger btn-block" id="close"><i class="fas fa-times-circle fa-2x"></i></button>
                            </div>
                        </div>
                    </div>
                    </div>
                <hr>
                <div class="col-md-12" id="list-content" data-email="{{ Auth::user()->email }}"></div>
            </div>
        </div>
    </div>
</div>
<script src="{{URL::asset('js/custom.js')}}"></script>
@endsection
