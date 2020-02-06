class Api::V1::TasksController < ApplicationController
  
  def index
    if params[:status] == "done"
     task = Task.where(:done => true)
      render json: task
    elsif params[:status] == "not_done"
      task = Task.where(:done => false)
      render json: task
    else
      task = Task.all.order(created_at: :desc)
      render json: task
    end
  end

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def create
    task = Task.create!(task_params)
    task.create_tags(params[:tags])
    
    # task.add_to_list(params[:tasklistid])
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def edit
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    task.update_tags(params[:tags])
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content, status: :ok
  end

  private
  def task_params
    params.permit(:name, :description, :done, :duedate, :tags, :tasklist_id)
  end

  def task
    @task ||= Task.find(params[:id])
  end

end
