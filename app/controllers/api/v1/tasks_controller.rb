class Api::V1::TasksController < ApplicationController
  def index
    task = Task.all.order(created_at: :desc)
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

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def destroy
    task&.destroy
    render json: { message: 'Task deleted!' }
  end

  private
  def task_params
    params.permit(:name, :description)
  end

  def task
    @task ||= Task.find(params[:id])
  end

end
