package com.starterkit.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.starterkit.domain.Album;
import com.starterkit.service.AlbumService;



/**
 * This AlbumController class for providing service to incoming client requests
 * 
 * @author Anand.Kittappa@cognizant.com
 */

@Controller
public class AlbumController {

	@Autowired
	private AlbumService albumService;

	/**
	 * Default Welcome page
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView welcome(Model model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("welcome");
		return view;
	}

	/**
	 * This method maps to GET type of HTTP request with /albums URL. Get the
	 * list of tasks from DB by calling the getAlbumList service. Send the album
	 * list as a response
	 * 
	 * @param model
	 * @return albums
	 */
	@RequestMapping(value = "/albums", method = RequestMethod.GET)
	public @ResponseBody List<Album> listAlbums(Model model) {
		if (albumService != null) {
			List<Album> albums = (List<Album>) albumService.getAlbumList();
			return albums;
		} else {
			return new ArrayList<Album>();
		}

	}

	/**
	 * This method maps to GET type of HTTP request with /deletealbum URL. Get
	 * the inputs from user via requestparam and delete the task from DB by
	 * calling removeAlbum service. Send the album list as a response
	 * 
	 * @param id
	 * @param model
	 * @return albums
	 */
	@RequestMapping(value = "/deletealbum", method = RequestMethod.GET)
	public @ResponseBody List<Album> deleteAlbum(@RequestParam("id") Long id, Model model) {
		if (albumService != null) {
			albumService.removeAlbum(id);
			List<Album> albums = albumService.getAlbumList();
			return albums;
		} else {
			return new ArrayList<Album>();
		}
	}

	/**
	 * This method maps to POST type of HTTP request with /addAlbum URL. Get the
	 * inputs from user via requestparam and save the album into DB by calling
	 * saveAlbum service. Send the album list as a response
	 * 
	 * @param title
	 * @param artist
	 * @param releaseYear
	 * @param model
	 * @return albums
	 */
	@RequestMapping(value = "/addAlbum", method = RequestMethod.POST)
	public @ResponseBody List<Album> addAlbum(@RequestParam(value = "title") String title,
			@RequestParam(value = "artist") String artist, @RequestParam(value = "releaseYear") String releaseYear,
			Model model) {
		if (albumService != null) {
			albumService.saveAlbum(title, artist, releaseYear);
			List<Album> albums = albumService.getAlbumList();
			return albums;
		} else {
			return new ArrayList<Album>();
		}
	}

	/**
	 * This method maps to POST type of HTTP request with /editAlbum URL. Get
	 * the inputs from user via requestparam and update the task into DB by
	 * calling editAlbum service. Send the album list as a response
	 * 
	 * @param title
	 * @param artist
	 * @param releaseYear
	 * @param id
	 * @param model
	 * @return albums
	 */
	@RequestMapping(value = "/editAlbum", method = RequestMethod.POST)
	public @ResponseBody List<Album> editAlbum(@RequestParam(value = "title") String title,
			@RequestParam(value = "artist") String artist, @RequestParam(value = "releaseYear") String releaseYear,
			@RequestParam(value = "id", required = true) Long id, Model model) {
		if (albumService != null) {
			albumService.editAlbum(id, title, artist, releaseYear);
			List<Album> albums = albumService.getAlbumList();
			return albums;
		} else {
			return new ArrayList<Album>();
		}
	}
}
