class TasklistsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    tasklist = Tasklist.all.order(created_at: :desc)
    render json: tasklist
  end

  def create
    tasklist = Tasklist.create!(tasklist_params)
    if tasklist
      render json: tasklist
    else
      render json: tasklist.errors
    end
  end

  def show
    if tasklist
      render json: tasklist
    else
      render json: tasklist.errors
    end
  end 
  
  def destroy
    tasklist = Tasklist.find(params[:id])
    tasklist.destroy
    head :no_content, status: :ok
  end

  def update
    tasklist = Tasklist.find(params[:id])
    tasklist.update_attributes(tasklist_params)
    render json: tasklist
  end

  private
  def tasklist_params
    params.permit(:name)
  end

  def tasklist
    @tasklist ||= Tasklist.find(params[:id])
  end


end
