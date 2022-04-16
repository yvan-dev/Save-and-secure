package com.cloud.saveandsecure.controller;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cloud.saveandsecure.dao.UserDao;
import com.cloud.saveandsecure.interfac.UserServiceInterf;
import com.cloud.saveandsecure.model.User;

@RestController
@RequestMapping("/user")
public class UserService implements UserServiceInterf {
	@Autowired
	UserDao userDao;
	@PersistenceContext
	EntityManager entityManager;

	@Override
	public ResponseEntity<String> addUser(User user) {
		if (user.getLogin() == "" || user.getPassword() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Le login et le mot de passe sont requis!");
		if (getUserByLogin(user.getLogin()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
					.body("Le login " + user.getLogin() + " existe déjà!"); // 208
		user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		userDao.save(user);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<Void> updateUser(User user) {
		if (user.getId() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		User userDb = userDao.findById(user.getId()).orElse(null);
		if (!userDb.getLogin().equals(user.getLogin()) && getUserByLogin(user.getLogin()) != null)
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
					.build();
		if (userDb == null)
			return ResponseEntity.notFound().build();
		if (user.getPassword() != "")
			user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		else
			user.setPassword(userDb.getPassword());
		userDao.save(user);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<Optional<User>> getUser(Integer id_user) {
		Optional<User> user;
		user = userDao.findById(id_user);
		if (user != null)
			return ResponseEntity.status(HttpStatus.OK).body(user);
		return ResponseEntity.notFound().build();
	}

	@Override
	public ResponseEntity<Void> deleteUser(Integer id_user) {
		try {
			userDao.deleteById(id_user);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			System.out.printf("Erreur lors de la suppression de l'user : ", e);
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
		}
	}

	/**
	 * Get all users whose first name, last name or login matches the given pattern
	 *
	 * @param pattern The pattern to search for.
	 * @return A list of users.
	 */
	@Override
	public ResponseEntity<List<User>> getUserByFirstOrLastNameOrLogin(String pattern) {
		String sql = "SELECT u from User u WHERE u.firstName LIKE '%" + pattern + "%' or u.lastName LIKE '%" + pattern
				+ "%' or u.login LIKE '%" + pattern + "%'";
		TypedQuery<User> query = entityManager.createQuery(sql, User.class);
		try {
			if (query.getResultList().size() == 0)
				return ResponseEntity.notFound().build();
			return ResponseEntity.status(HttpStatus.OK).body(query.getResultList());
		} catch (NoResultException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public User getUserByLogin(String login) {
		String sql = "SELECT u FROM User u WHERE u.login = :login";
		TypedQuery<User> query = entityManager.createQuery(sql, User.class);
		query.setParameter("login", login);
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public ResponseEntity<List<User>> getAllUser() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(userDao.findAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<User> getUserLogged() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User userDb = userDao.findByLogin(auth.getPrincipal().toString());
		if (userDb != null)
			return ResponseEntity.status(HttpStatus.OK).body(userDb);
		return ResponseEntity.notFound().build();
	}
}