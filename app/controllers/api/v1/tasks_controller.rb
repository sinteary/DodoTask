class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    if params[:status] == "done"
     task = Task.where(:done => true)
      render json: task
    elsif params[:status] == "not_done"
      task = Task.where(:done => false)
      render json: task
    elsif params[:status] == "done" 
      task = Task.all.order(created_at: :desc)
      render json: task
    end
    
  end

  def incomplete_tasks
    task = Task.where(:done => false).order(created_at: :des)
    render json: task
  end

  def create
    task = Task.create!(task_params)
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def edit
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content, status: :ok
  end

  private
  def task_params
    params.permit(:name, :description, :done, :duedate)
  end

  def task
    @task ||= Task.find(params[:id])
  end

end
