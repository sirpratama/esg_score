import 'package:flutter/material.dart';
import 'package:garudahack6/pages/homepages.dart';
import 'package:garudahack6/pages/companypages.dart';
import 'package:garudahack6/pages/loginscreen.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B2320),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(height: 30),
              // Logo
              const Text(
                'LOGO',
                style: TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey,
                  letterSpacing: 2,
                ),
              ),
              const SizedBox(height: 60),
              // Choose Role
              const Text(
                'Choose Your Role ?',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFE6FF6A),
                ),
              ),
              const SizedBox(height: 40),
              // Role Cards
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Customer Card
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => HomePages()),
                          );
                        },
                        child: Container(
                          height: 180,
                          margin: const EdgeInsets.only(right: 12),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(36),
                            gradient: const LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                Color(0xFFE6FF6A),
                                Color(0xFFC6F07E),
                              ],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                blurRadius: 8,
                                offset: Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Image.asset('assets/images/owner.jpg', height: 48),
                              const SizedBox(height: 12),
                              const Text(
                                'Customer',
                                style: TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF2B3A2B),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Business Owner Card
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const LoginScreen()),
                          );
                        },
                        child: Container(
                          height: 180,
                          margin: const EdgeInsets.only(left: 12),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(36),
                            gradient: const LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                Color(0xFFE6FF6A),
                                Color(0xFF0B2320),
                              ],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                blurRadius: 8,
                                offset: Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Image.asset('assets/images/owner.jpg', height: 48),
                              const SizedBox(height: 12),
                              const Text(
                                'Business Owner',
                                style: TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF2B3A2B),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}