import 'package:flutter/material.dart';
import 'package:garudahack6/pages/landingscreen.dart';
import 'package:garudahack6/pages/registerscree.dart';
import 'package:garudahack6/pages/homepages.dart';
import 'package:garudahack6/pages/companypages.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF39795B),
              Color(0xFFA8E063),
            ],
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Container(
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(40),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.08),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const SizedBox(height: 12),
                    //Image.asset('assets/logo.png', height: 64),
                    const Text(
                      'LOGO',
                      style: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Login',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF39795B),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Username
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'username',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Password
                    TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: 'password',
                        contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32),
                          borderSide: const BorderSide(color: Color(0xFF39795B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Login Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (context) => HomePages(isBusinessOwner: true)),
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFE6FF6A),
                          foregroundColor: const Color(0xFF39795B),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          textStyle: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                          elevation: 0,
                        ),
                        child: const Text('login'),
                      ),
                    ),
                    const SizedBox(height: 12),
                    // Or separator
                    Row(
                      children: [
                        Expanded(
                          child: Divider(
                            color: Colors.grey[400],
                            thickness: 1,
                          ),
                        ),
                        const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 8.0),
                          child: Text('or', style: TextStyle(color: Colors.grey)),
                        ),
                        Expanded(
                          child: Divider(
                            color: Colors.grey[400],
                            thickness: 1,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    // Register link
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const RegisterScreen()),
                        );
                      },
                      child: const Text(
                        'Do not have an account? Register your Business  here',
                        style: TextStyle(
                          color: Color(0xFF6BCB77),
                          fontSize: 15,
                          fontWeight: FontWeight.w400,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
