class TagsController < ApplicationController
  def index
    # tag = Tag.where("name = ? AND user_id = ?", params[:queries], params[:user_id]);
    tag = Tag.where(name: params[:queries], user_id: params[:user_id]);
    if tag
      render json: tag
    else
      render json: tag.errors
    end
    
  end

  def create
    tag = Tag.find_or_create_by(params[:name])
    if tag
      render json: tag
    else
      render json: tag.errors
    end
  end

  def edit
    
  end

  def show
    if task
      render json: tag
    else
      render json: tag.errors
    end
  end 
  
  def destroy
    tag = Tag.find(params[:id])
    tag.destroy
    head :no_content, status: :ok
  end

  private
  def tag_params
    params.permit(:name, :queries, :user_id)
  end

  def tag
    @tag ||= Tag.find(params[:id])
  end
end
