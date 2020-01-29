class TagsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    tag = Tag.create!(tag_params)
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

  end

  private
  def tag_params
    params.permit(:name)
  end

  def tag
    @tag ||= Tag.find(params[:id])
  end
end
