#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from datetime import datetime
import json
import dateutil.parser
import babel
from flask import Flask, render_template, request, Response, flash, redirect, url_for, abort
from flask.signals import Namespace
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy.model import NameMetaMixin
from sqlalchemy import desc
import logging
from logging import Formatter, FileHandler
from flask_migrate import Migrate
from flask_wtf import Form
from sqlalchemy.sql.expression import false
from wtforms.fields.core import StringField
from forms import *
import sys
import sysconfig
import syslog
#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
moment = Moment(app)
app.config.from_object('config')
db = SQLAlchemy(app)
migrate = Migrate(app, db)

logging.basicConfig(level=logging.DEBUG)

# TODO-DONE: connect to a local postgresql database 
#Using psql, connect to fyyur db---- Done.

#----------------------------------------------------------------------------#
# Models.
#----------------------------------------------------------------------------#


class Venue(db.Model):
    __tablename__ = 'Venue'

    id = db.Column(db.Integer, primary_key=True, autoincrement="auto")
    name = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=True)
    image_link = db.Column(db.String(500), nullable=True)
    facebook_link = db.Column(db.String(120), nullable=True)
    genres = db.Column(db.String(120), nullable=False)
    website_link = db.Column(db.String(500), nullable=True)
    seeking_talent = db.Column(db.Boolean, nullable=True, default=False)
    seeking_description = db.Column(db.String(), nullable=True)
    show = db.relationship('Show', backref='venue', lazy=True)


    # TODO-DONE: implement any missing fields, as a database migration using Flask-Migrate
    # DONE, initialized flask db migration via...
    # python3 -m flask db init
    # python3 -m flask db migrate
    # python3 -m flask db upgrade

class Artist(db.Model):
    __tablename__ = 'Artist'

    id = db.Column(db.Integer, primary_key=True, autoincrement="auto")
    name = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=True)
    genres = db.Column(db.String(120), nullable=False)
    image_link = db.Column(db.String(500), nullable=True)
    facebook_link = db.Column(db.String(120), nullable=True)
    website_link = db.Column(db.String(500), nullable=True)
    seeking_venue = db.Column(db.Boolean, nullable=True, default=False)
    seeking_description = db.Column(db.String(), nullable=True)
    show = db.relationship('Show', backref='artist', lazy=True)

    # TODO-DONE: implement any missing fields, as a database migration using Flask-Migrate
    # Complete. Artist table now in local db.

# TODO-DONE Implement Show and Artist models, and complete all model relationships and properties, as a database migration.
class Show(db.Model):
  __tablename__ = 'Show'

  id = db.Column(db.Integer, primary_key=True, autoincrement='auto')
  artist_id = db.Column(db.Integer, db.ForeignKey('Artist.id'), nullable=True)
  venue_id = db.Column(db.Integer, db.ForeignKey('Venue.id'), nullable =True)
  start_time = db.Column(db.DateTime, nullable=False, default=datetime.today)

#----------------------------------------------------------------------------#
# Filters.
#----------------------------------------------------------------------------#

def format_datetime(value, format='medium'):
  date = dateutil.parser.parse(value)
  if format == 'full':
      format="EEEE MMMM, d, y 'at' h:mma"
  elif format == 'medium':
      format="EE MM, dd, y h:mma"
  return babel.dates.format_datetime(date, format, locale='en')

app.jinja_env.filters['datetime'] = format_datetime

#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#

@app.route('/')
def index():
  return render_template('pages/home.html')


#  Venues
#  ----------------------------------------------------------------

@app.route('/venues')
def venues():
  # TODO-DONE: replace with real venues data. DONE
  #       num_shows should be aggregated based on number of upcoming shows per venue.
  # TODO-DONE: replace with real venues data. DONE
  try:
    # Select all values of cities, states
    cities_states = Venue.query.with_entities(Venue.city, Venue.state).all()
    # Select all unique (distinct) values of cities, states
    unique_city_state = set(cities_states)
    areas =[]
    #loop through venues in db to check for upcoming shows, city, states and venue information
    for city in unique_city_state:
      venues = db.session.query(Venue.id, Venue.name).order_by(desc(Venue.id)).filter(Venue.city == city[0]).filter(Venue.state == city[1])
      areas.append({
        "city": city[0],
        "state": city[1],
        "venues": venues
      })
    return render_template('pages/venues.html', areas=areas)
  except:
    print(sys.exc_info())
    flash('Something went wrong! Try again!')
    return render_template("pages/home.html")   

  
@app.route('/venues/search', methods=['POST'])
def search_venues():
  # TODO-DONE: implement search on artists with partial string search. Ensure it is case-insensitive.
  # seach for Hop should return "The Musical Hop".
  # search for "Music" should return "The Musical Hop" and "Park Square Live Music & Coffee"
  search_term = request.form.get('search_term')
  search_term = search_term.strip()
  
  venue_query = Venue.query.filter(Venue.name.ilike('%{}%'.format(search_term)))
  venue_list = list(venue_query)
  response = {
    "count":len(venue_list),
    "data": venue_list
  }
  return render_template('pages/search_venues.html', results=response, search_term=request.form.get('search_term', ''))


@app.route('/venues/<int:venue_id>')
def show_venue(venue_id):
  # shows the venue page with the given venue_id
  # TODO-DONE: replace with real venue data from the venues table, using venue_id <<<DONE!
  
  venue = Venue.query.get(venue_id)
# 
  upcoming_shows = db.session.query(Show).join(Artist).filter(Show.venue_id==venue_id).all()
  past_shows=db.session.query(Show).join(Artist).filter(Show.venue_id==venue_id).all()
  
  past_shows= []

  for show in past_shows:
    past_shows.append({
        'start_time': Show.start_time,
      }) 
  past_shows_count = len(past_shows)
  upcoming_shows_count = len(upcoming_shows) 

  data = {
    'past_shows': past_shows,
    'upcoming_shows': upcoming_shows,
    'past_shows_count': past_shows_count,
    'upcoming_shows_count': upcoming_shows_count,
    }

  app.logger.info(venue)


  return render_template('pages/show_venue.html', venue=venue, data=data)

#  Create Venue
#  ----------------------------------------------------------------

@app.route('/venues/create', methods=['GET'])
def create_venue_form():
  form = VenueForm()
  return render_template('forms/new_venue.html', form=form)

  # TODO-DONE: insert form data as a new Venue record in the db, instead -DONE
  # TODO-DONE: modify data to be the data object returned from db insertion -DONE
@app.route('/venues/create', methods=['POST'])
def create_venue_submission():
  form = VenueForm(request.form)
  error = False
  try:
    venue = Venue(
      name=form.name.data,
      city=form.city.data,
      state=form.state.data,
      address=form.address.data,
      phone=form.phone.data,
      image_link=form.image_link.data,
      facebook_link=form.facebook_link.data,
      genres=form.genres.data,
      website_link=form.website_link.data,
      seeking_talent=form.seeking_talent.data,
      seeking_description=form.seeking_description.data)
    db.session.add(venue)
    db.session.commit()
    flash('Venue ' + request.form['name'] + ' was successfully listed!')
  except():
    db.session.rollback()
    error = True
    flash('Venue ' + request.form['name'] + ' could not be listed.')
    print(sys.exc_info())
  finally:
    db.session.close()
  if error:
    abort(500)
  else:
    return render_template('pages/home.html')
  # on successful db insert, flash success
  
  # TODO-DONE: on unsuccessful db insert, flash an error instead. -DONE
  

@app.route('/venues/<venue_id>', methods=['DELETE'])
def delete_venue(venue_id):
  # TODO-DONE: Complete this endpoint for taking a venue_id, and using
  # SQLAlchemy ORM to delete a record. Handle cases where the session commit could fail.
  venue = Venue.query.get(venue_id)
  error = False

  try:
    db.session.delete(venue)
    db.session.commit()
    flash('Venue ' + {venue.name} + ' was successfully deleted!')
  except():
    error = True
    db.session.rollback()
    flash('Venue ' + {venue.name} + ' could not be deleted.')
    print(sys.exc_info())
  finally:
    db.session.close()
    flash('Venue table updated!')
  if error:
    abort(500)
  else:
    return render_template('pages/home.html')


  # BONUS CHALLENGE: Implement a button to delete a Venue on a Venue Page, have it so that
  # clicking that button delete it from the db then redirect the user to the homepage
 


#  Artists
#  ----------------------------------------------------------------
@app.route('/artists')
def artists():
  # TODO-DONE: replace with real data returned from querying the database -- DONE

  try:
    # Select all Artists and order by dec values
    artists = db.session.query(Artist.id, Artist.name).order_by(desc(Artist.id))
    app.logger.info(artists)
    return render_template('pages/artists.html', artists=artists)
  except:
    print(sys.exc_info())
    flash('Something went wrong! Try again!')
    return render_template("pages/home.html") 


@app.route('/artists/search', methods=['POST'])
def search_artists():
  # TODO-DONE: implement search on artists with partial string search. Ensure it is case-insensitive.
  # seach for "A" should return "Guns N Petals", "Matt Quevado", and "The Wild Sax Band".
  # search for "band" should return "The Wild Sax Band".
  search_term = request.form.get('search_term')
  search_term = search_term.strip()
  
  artist_query = Artist.query.filter(Artist.name.ilike('%{}%'.format(search_term)))
  artist_list = list(artist_query)
  results = {
    "count":len(artist_list),
    "data": artist_list
  }
  return render_template('pages/search_venues.html', results=results, search_term=request.form.get('search_term', ''))
  
  
  response={
    "count": 1,
    "data": [{
      "id": 4,
      "name": "Guns N Petals",
      "num_upcoming_shows": 0,
    }]
  }
  return render_template('pages/search_artists.html', results=response, search_term=request.form.get('search_term', ''))

@app.route('/artists/<int:artist_id>')
def show_artist(artist_id):
  # shows the artist page with the given artist_id
  # TODO-DONE: replace with real artist data from the artist table, using artist_id---DONE
  
  artist = Artist.query.get(artist_id)
# 
  upcoming_shows = db.session.query(Show).join(Venue).filter(Show.artist_id==artist_id).all()
  past_shows=db.session.query(Show).join(Venue).filter(Show.artist_id==artist_id).all()
  
  past_shows= []

  for show in past_shows:
    past_shows.append({
        'start_time': Show.start_time,
      }) 
  past_shows_count = len(past_shows)
  upcoming_shows_count = len(upcoming_shows) 

  data = {
    'past_shows': past_shows,
    'upcoming_shows': upcoming_shows,
    'past_shows_count': past_shows_count,
    'upcoming_shows_count': upcoming_shows_count,
    }


  return render_template('pages/show_artist.html', artist=artist, data=data)
  

#  Update
#  ----------------------------------------------------------------
@app.route('/artists/<int:artist_id>/edit', methods=['GET'])
def edit_artist(artist_id):
  
  form = ArtistForm()
  artist = Artist.query.get(artist_id)

  if artist:
    form.name.data = artist.name,
    form.genres.data = artist.genres,
    form.city.data = artist.city,
    form.state.data = artist.state,
    form.phone.data = artist.phone,
    form.website_link.data = artist.website_link,
    form.facebook_link.data = artist.facebook_link,
    form.seeking_venue.data = artist.seeking_venue,
    form.seeking_description.data = artist.seeking_description,
    form.image_link.data = artist.image_link
  
  # TODO-DONE: populate form with fields from artist with ID <artist_id>
  return render_template('forms/edit_artist.html', form=form, artist=artist)

@app.route('/artists/<int:artist_id>/edit', methods=['POST'])
def edit_artist_submission(artist_id):
  # TODO-DONE: take values from the form submitted, and update existing
  # artist record with ID <artist_id> using the new attributes
  
  # Grabbing all columns of info with artist id, to update
  artist = Artist.query.get(artist_id)
  error = False
  
  # re-writing information to those columns grabbed
  try:
    form = ArtistForm(request.form)
    
    artist.name =form.name.data
    artist.city=form.city.data
    artist.state=form.state.data
    artist.phone=form.phone.data
    artist.genres=form.genres.data
    artist.image_link=form.image_link.data
    artist.facebook_link=form.facebook_link.data
    artist.website_link=form.website_link.data
    artist.seeking_description=form.seeking_description.data
    if form.seeking_venue.data == 'y':
      artist.seeking_venue=True
    else:
      artist.seeking_venue=False
    
    db.session.add(artist)
    db.session.commit()
    flash('Artist ' + request.form['name'] + ' was successfully listed!')
  except():
    error = True
    db.session.rollback()
    flash('Artist ' + request.form['name'] + ' could not be updated.')
    print(sys.exc_info())
  finally:
    db.session.close()
    flash('Artist table updated!')
  if error:
    abort(500)
  else:
    return redirect(url_for('show_artist', artist_id=artist_id))

@app.route('/venues/<int:venue_id>/edit', methods=['GET'])
def edit_venue(venue_id):
  form = VenueForm()
  venue = Venue.query.get(venue_id)
  
  if venue:
    form.name.data = venue.name.strip("\,()."),
    form.genres.data = venue.genres,
    form.city.data = venue.city,
    form.state.data = venue.state,
    form.address.data = venue.address,
    form.phone.data = venue.phone,
    form.website_link.data = venue.website_link,
    form.facebook_link.data = venue.facebook_link,
    form.seeking_talent.data = venue.seeking_talent,
    form.seeking_description.data = venue.seeking_description,
    form.image_link.data = venue.image_link

  # TODO--DONE: populate form with values from venue with ID <venue_id>
  return render_template('forms/edit_venue.html', form=form, venue=venue)

@app.route('/venues/<int:venue_id>/edit', methods=['POST'])
def edit_venue_submission(venue_id):
  # TODO: take values from the form submitted, and update existing
  # venue record with ID <venue_id> using the new attributes
  venue = Venue.query.get(venue_id)
  error = False
  
  # re-writing information to those columns grabbed
  try:
    form = VenueForm(request.form)
    
    venue.name =form.name.data.strip("\,().")
    venue.city=form.city.data
    venue.state=form.state.data
    venue.address=form.address.data
    venue.phone=form.phone.data
    venue.genres=form.genres.data
    venue.image_link=form.image_link.data
    venue.facebook_link=form.facebook_link.data
    venue.website_link=form.website_link.data
    venue.seeking_description=form.seeking_description.data
    if form.seeking_talent.data == 'y':
      venue.seeking_talent=True
    else:
      venue.seeking_talent=False
    
    db.session.add(venue)
    db.session.commit()
    flash('Venue ' + request.form['name'] + ' was successfully listed!')
  except():
    error = True
    db.session.rollback()
    flash('Venue ' + request.form['name'] + ' could not be updated.')
    print(sys.exc_info())
  finally:
    db.session.close()
    flash('Venue table updated!')
  if error:
    abort(500)
  else:
    return redirect(url_for('show_venue', venue_id=venue_id))

#  Create Artist
#  ----------------------------------------------------------------

@app.route('/artists/create', methods=['GET'])
def create_artist_form():
  form = ArtistForm()
  return render_template('forms/new_artist.html', form=form)

@app.route('/artists/create', methods=['POST'])
def create_artist_submission():
  form = ArtistForm(request.form)
  error = False
  try:
    artist = Artist(
      name=form.name.data,
      city=form.city.data,
      state=form.state.data,
      phone=form.phone.data,
      genres=form.genres.data,
      image_link=form.image_link.data,
      facebook_link=form.facebook_link.data,
      website_link=form.website_link.data,
      seeking_venue=form.seeking_venue.data,
      seeking_description=form.seeking_description.data)
    db.session.add(artist)
    db.session.commit()
    flash('Artist ' + request.form['name'] + ' was successfully listed!')
  except():
    db.session.rollback()
    error = True
    flash('Artist ' + request.form['name'] + ' could not be listed.')
    print(sys.exc_info())
  finally:
    db.session.close()
  if error:
    abort(500)
  else:
    return render_template('pages/home.html')
  # on successful db insert, flash success
  # called upon submitting the new artist listing form
  # TODO-DONE: insert form data as a new Venue record in the db, instead DONE
  # TODO-DONE: modify data to be the data object returned from db insertion DONE



#  Shows
#  ----------------------------------------------------------------

@app.route('/shows')
def shows():

  data=[{
    "venue_id": 1,
    "venue_name": "The Musical Hop",
    "artist_id": 4,
    "artist_name": "Guns N Petals",
    "artist_image_link": "https://images.unsplash.com/photo-1549213783-8284d0336c4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "start_time": "2019-05-21T21:30:00.000Z"
  }, {
    "venue_id": 3,
    "venue_name": "Park Square Live Music & Coffee",
    "artist_id": 5,
    "artist_name": "Matt Quevedo",
    "artist_image_link": "https://images.unsplash.com/photo-1495223153807-b916f75de8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    "start_time": "2019-06-15T23:00:00.000Z"
  }, {
    "venue_id": 3,
    "venue_name": "Park Square Live Music & Coffee",
    "artist_id": 6,
    "artist_name": "The Wild Sax Band",
    "artist_image_link": "https://images.unsplash.com/photo-1558369981-f9ca78462e61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=794&q=80",
    "start_time": "2035-04-01T20:00:00.000Z"
  }, {
    "venue_id": 3,
    "venue_name": "Park Square Live Music & Coffee",
    "artist_id": 6,
    "artist_name": "The Wild Sax Band",
    "artist_image_link": "https://images.unsplash.com/photo-1558369981-f9ca78462e61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=794&q=80",
    "start_time": "2035-04-08T20:00:00.000Z"
  }, {
    "venue_id": 3,
    "venue_name": "Park Square Live Music & Coffee",
    "artist_id": 6,
    "artist_name": "The Wild Sax Band",
    "artist_image_link": "https://images.unsplash.com/photo-1558369981-f9ca78462e61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=794&q=80",
    "start_time": "2035-04-15T20:00:00.000Z"
  }]
  return render_template('pages/shows.html', shows=data)

@app.route('/shows/create')
def create_shows():
  # renders form. do not touch.
  form = ShowForm()
  return render_template('forms/new_show.html', form=form)

@app.route('/shows/create', methods=['POST'])
def create_show_submission():
  # called to create new shows in the db, upon submitting new show listing form
  # TODO-DONE: insert form data as a new Show record in the db, instead --DONE
  error = False
  form = ShowForm(request.form)
  try:
    show = Show(
      venue_id=form.venue_id.data,
      artist_id=form.artist_id.data,
      start_time=form.start_time.data)
    db.session.add(show)
    db.session.commit()
    flash('Show was successfully listed!')
  except():
    db.session.rollback()
    error = True
    flash('Show could not be listed.')
    print(sys.exc_info())
  finally:
    db.session.close()
  if error:
    abort(500)
  else:
    return render_template('pages/home.html')

@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def server_error(error):
    return render_template('errors/500.html'), 500


if not app.debug:
    file_handler = FileHandler('error.log')
    file_handler.setFormatter(
        Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    )
    app.logger.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('errors')

#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''
